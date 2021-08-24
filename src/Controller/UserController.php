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
     * @Route("/users/", name="user")
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

        return new JsonResponse($users);
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
