<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;

class UserController extends AbstractController
{
    /**
     * @Route("/api/users", name="user")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getAll(): Response
    {
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery(
            'SELECT u.id,
                    u.login,
                    u.email,
                    u.firstname,
                    u.lastname
            FROM App\Entity\User u'
        );
        $users = $query->getArrayResult();

        $response = new JsonResponse($users);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    /**
     * @Route("/users/{id}", name="user_get")
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
