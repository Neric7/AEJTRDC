<?php
// backend/fix-storage.php
// Exécutez avec : php fix-storage.php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "🔧 Correction du stockage des images...\n\n";

// 1. Vérifier le lien symbolique
$publicStorage = __DIR__ . '/public/storage';
$storagePublic = __DIR__ . '/storage/app/public';

echo "1. Vérification du lien symbolique...\n";
if (is_link($publicStorage)) {
    echo "   ✅ Le lien existe\n";
} else {
    echo "   ❌ Le lien n'existe pas - Création...\n";
    if (file_exists($publicStorage)) {
        echo "   ⚠️  Un dossier existe déjà - Suppression...\n";
        rmdir($publicStorage);
    }
    symlink($storagePublic, $publicStorage);
    echo "   ✅ Lien créé\n";
}

// 2. Créer le dossier news
echo "\n2. Création du dossier news...\n";
$newsDir = $storagePublic . '/news';
if (!is_dir($newsDir)) {
    mkdir($newsDir, 0755, true);
    echo "   ✅ Dossier créé: $newsDir\n";
} else {
    echo "   ✅ Dossier existe déjà\n";
}

// 3. Lister tous les fichiers dans storage/app/public
echo "\n3. Fichiers dans storage/app/public:\n";
$files = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($storagePublic),
    RecursiveIteratorIterator::LEAVES_ONLY
);

foreach ($files as $file) {
    if ($file->isFile()) {
        $relativePath = str_replace($storagePublic . DIRECTORY_SEPARATOR, '', $file->getPathname());
        echo "   📄 $relativePath\n";
        
        // Si fichier image à la racine, le déplacer dans news/
        if (!str_contains($relativePath, DIRECTORY_SEPARATOR) && 
            preg_match('/\.(jpg|jpeg|png|gif|webp)$/i', $relativePath)) {
            $newPath = $newsDir . '/' . basename($relativePath);
            if (!file_exists($newPath)) {
                copy($file->getPathname(), $newPath);
                echo "      ➜ Déplacé vers: news/" . basename($relativePath) . "\n";
            }
        }
    }
}

// 4. Mettre à jour les chemins dans la base de données
echo "\n4. Mise à jour des chemins dans la base de données...\n";
$news = DB::table('news')->get();

foreach ($news as $item) {
    if ($item->image && !str_starts_with($item->image, 'news/')) {
        $oldPath = $item->image;
        $newPath = 'news/' . basename($item->image);
        
        // Vérifier que le fichier existe
        if (file_exists($storagePublic . '/' . $newPath)) {
            DB::table('news')->where('id', $item->id)->update(['image' => $newPath]);
            echo "   ✅ ID {$item->id}: $oldPath → $newPath\n";
        } else {
            echo "   ⚠️  ID {$item->id}: Fichier introuvable - $newPath\n";
        }
    }
}

echo "\n✨ Terminé!\n";
echo "\n📋 Testez maintenant:\n";
echo "   http://localhost:8000/storage/news/test.txt\n";
echo "   http://localhost:8000/api/news\n";