<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\News;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Récupérer tous les articles de news
        $newsArticles = News::all();

        if ($newsArticles->isEmpty()) {
            $this->command->warn('Aucun article trouvé. Veuillez d\'abord exécuter NewsSeeder.');
            return;
        }

        $commentData = [
            [
                'author_name' => 'Jean-Pierre Kalala',
                'author_email' => 'jp.kalala@example.com',
                'content' => 'Excellente initiative ! C\'est exactement ce dont nos enfants ont besoin. Bravo à l\'équipe de l\'AEJT-RDC.',
                'status' => 'approved',
            ],
            [
                'author_name' => 'Marie Nsimba',
                'author_email' => 'marie.nsimba@example.com',
                'content' => 'Comment puis-je inscrire mon enfant à ce programme ? Y a-t-il des critères d\'éligibilité ?',
                'status' => 'approved',
            ],
            [
                'author_name' => 'Patrick Lukombe',
                'author_email' => 'p.lukombe@example.com',
                'content' => 'Merci pour tout ce que vous faites pour nos enfants. Que Dieu vous bénisse.',
                'status' => 'approved',
            ],
            [
                'author_name' => 'Sylvie Mputu',
                'author_email' => 'sylvie.m@example.com',
                'content' => 'Je suis enseignante et j\'aimerais collaborer avec votre organisation. Comment puis-je vous contacter ?',
                'status' => 'approved',
            ],
            [
                'author_name' => 'Robert Tshimanga',
                'author_email' => 'robert.t@example.com',
                'content' => 'Très bon programme. J\'espère qu\'il sera étendu à d\'autres provinces également.',
                'status' => 'approved',
            ],
            [
                'author_name' => 'Grace Kabongo',
                'author_email' => 'grace.k@example.com',
                'content' => 'Mon fils a bénéficié de vos programmes l\'année dernière. Il est maintenant en 6ème année. Merci infiniment !',
                'status' => 'approved',
            ],
            [
                'author_name' => 'David Mukendi',
                'author_email' => 'david.m@example.com',
                'content' => 'Quels sont les prochains projets prévus ? J\'aimerais suivre vos activités de plus près.',
                'status' => 'approved',
            ],
            [
                'author_name' => 'Esther Kinshasa',
                'author_email' => 'esther.k@example.com',
                'content' => 'Formidable travail ! Notre communauté a vraiment besoin de ce genre d\'initiatives.',
                'status' => 'approved',
            ],
            [
                'author_name' => 'Joseph Mbala',
                'author_email' => 'joseph.mbala@example.com',
                'content' => 'Je suis bénévole dans une autre ONG. Pouvons-nous collaborer sur certains projets ?',
                'status' => 'pending',
            ],
            [
                'author_name' => 'Thérèse Nzuzi',
                'author_email' => 'therese.n@example.com',
                'content' => 'Où puis-je trouver plus d\'informations sur vos rapports d\'activités ?',
                'status' => 'approved',
            ],
        ];

        // Réponses pour certains commentaires
        $replies = [
            [
                'author_name' => 'Équipe AEJT-RDC',
                'author_email' => 'contact@aejtrdc.org',
                'content' => 'Merci pour votre message ! Pour inscrire votre enfant, vous pouvez vous rendre dans nos bureaux ou appeler notre ligne d\'assistance. Les critères sont basés sur la situation de vulnérabilité et l\'âge de l\'enfant.',
                'status' => 'approved',
            ],
            [
                'author_name' => 'Équipe AEJT-RDC',
                'author_email' => 'contact@aejtrdc.org',
                'content' => 'Nous serions ravis de collaborer avec vous ! Veuillez nous contacter via notre formulaire de contact ou par email à partenariats@aejtrdc.org',
                'status' => 'approved',
            ],
            [
                'author_name' => 'Équipe AEJT-RDC',
                'author_email' => 'contact@aejtrdc.org',
                'content' => 'Merci pour votre témoignage ! C\'est des retours comme celui-ci qui nous motivent à continuer notre mission. Tous nos vœux de réussite à votre fils !',
                'status' => 'approved',
            ],
        ];

        // Ajouter des commentaires à chaque article
        foreach ($newsArticles as $index => $news) {
            // Nombre aléatoire de commentaires par article (entre 2 et 5)
            $numComments = rand(2, 5);
            
            for ($i = 0; $i < $numComments; $i++) {
                if (!isset($commentData[$i])) break;
                
                $comment = Comment::create([
                    'news_id' => $news->id,
                    'author_name' => $commentData[$i]['author_name'],
                    'author_email' => $commentData[$i]['author_email'],
                    'content' => $commentData[$i]['content'],
                    'status' => $commentData[$i]['status'],
                    'ip_address' => '127.0.0.' . rand(1, 255),
                    'created_at' => now()->subDays(rand(1, 30)),
                ]);

                // Ajouter une réponse à certains commentaires
                if ($i < 3 && isset($replies[$i])) {
                    Comment::create([
                        'news_id' => $news->id,
                        'parent_id' => $comment->id,
                        'author_name' => $replies[$i]['author_name'],
                        'author_email' => $replies[$i]['author_email'],
                        'content' => $replies[$i]['content'],
                        'status' => $replies[$i]['status'],
                        'ip_address' => '127.0.0.1',
                        'created_at' => $comment->created_at->addHours(rand(2, 48)),
                    ]);
                }
            }

            $this->command->info("✅ {$numComments} commentaire(s) ajouté(s) à : {$news->title}");
        }

        $totalComments = Comment::count();
        $this->command->info("🎉 Total : {$totalComments} commentaires créés avec succès !");
    }
}