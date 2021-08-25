<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\HttpFoundation\JsonResponse;

class NoteController extends AbstractController
{
     /**
     * @Route("/api/notes", name="all_notes")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getAll(): Response
    {
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery(
            'SELECT u.id,
                    u.title,
                    u.content
            FROM App\Entity\Note u'
        );
        $notes = $query->getArrayResult();

        $response = new JsonResponse($notes);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    /**
     * @Route("/api/notes/{id}", name="note_get_by_id")
     */
    public function new($id) {
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($id);

        if (!$user) {
            throw $this->createNotFoundException(
                'No product found for id '.$id
            );
        }
        return new Response('User login: '.$user->getEmail());
    }
}
