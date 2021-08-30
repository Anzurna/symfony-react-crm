<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\HttpFoundation\Request;
use App\Entity\Note;

use Symfony\Component\HttpFoundation\JsonResponse;

class NoteController extends AbstractController
{
    /**
     * @Route("/api/notes/create", name="note_create", methods={"POST"})
     */
    public function create(): Response {

        $request = Request::createFromGlobals();
        $entityManager = $this->getDoctrine()->getManager();


        $data = $request->toArray();

        $note = new Note();
        $note->setTitle($data["title"]);
        $note->setContent($data["content"]);
   
        $entityManager->persist($note);
     
        $entityManager->flush();

        return new Response('Saved new note');
    }

    /**
     * @Route("/api/notes/delete", name="note_delete", methods={"DELETE"})
     */
    public function delete(): Response {
        $request = Request::createFromGlobals();
        $id = $request->toArray()["id"];

        $em = $this->getDoctrine()->getManager();
        $note=$this->getDoctrine()->getRepository(Note::class)->find($id);

        $em->remove($note);
        $em->flush();
        
        return new Response('Deleted note with id '.$id);
    }

    /**
     * @Route("/api/notes/update", name="note_update", methods={"PUT"})
     */
    public function update(): Response {
        $request = Request::createFromGlobals();
        $noteData = $request->toArray();
        
        $em = $this->getDoctrine()->getManager();
        $note = $em->getRepository(Note::class)->find($noteData["id"]);

        if (!$note) {
            throw $this->createNotFoundException(
                'No note found for id '.$noteData["id"]
            );
        }

        $note->setTitle($noteData["title"]);
        $note->setContent($noteData["content"]);
        $em->flush();

        return new Response('Updated note');
    }
     /**
     * @Route("/api/notes", name="all_notes")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getAll(): Response
    {
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery(
            'SELECT n.id,
                    n.title,
                    n.content
            FROM App\Entity\Note n'
        );
        $notes = $query->getArrayResult();

        $response = new JsonResponse($notes);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    /**
     * @Route("/api/notes/{id}", name="note_get")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function findOne($id) {
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery(
            'SELECT n.id,
                    n.title,
                    n.content
            FROM App\Entity\Note n
            WHERE n.id = :id'          
        );

        $query->setParameter('id', $id);

        $note = $query->getArrayResult();

        $response = new JsonResponse($note);
        return $response;
    }
}
