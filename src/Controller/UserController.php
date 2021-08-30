<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;

use Symfony\Component\HttpFoundation\Request;

class UserController extends AbstractController
{

    /**
     * @Route("/api/users/create", name="user_create", methods={"POST"})
     */
    public function createUser(): Response {

        $request = Request::createFromGlobals();
        $entityManager = $this->getDoctrine()->getManager();


        $data = $request->toArray();

        $user = new User();
        $user->setLogin($data["login"]);
        $user->setEmail($data["email"]);
        $user->setPass($data["password"]);
        $user->setFirstname($data["firstname"]);
        $user->setLastname($data["lastname"]);
 

        // tell Doctrine you want to (eventually) save the Product (no queries yet)
        $entityManager->persist($user);

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();

        return new Response('Saved new user with id '.$user->getId());
    }

    /**
     * @Route("/api/users/delete", name="user_delete", methods={"DELETE"})
     */
    public function deleteUser(): Response {
        $request = Request::createFromGlobals();
        $email = $request->toArray()["email"];

        $em = $this->getDoctrine()->getManager();
        $user=$this->getDoctrine()->getRepository(User::class)->findOneBy(['email'=>$email]);

        $em->remove($user);
        $em->flush();
        
        return new Response('Deleted user with email '.$email);
    }

    /**
     * @Route("/api/users/update", name="user_update", methods={"PUT"})
     */
    public function updateUser(): Response {
        $request = Request::createFromGlobals();
        $userData = $request->toArray();
        
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository(User::class)->findOneBy(['email'=> $userData["curr_email"]]);;

        if (!$user) {
            throw $this->createNotFoundException(
                'No user found for email '.$userData["curr_email"]
            );
        }

        $user->setLogin($userData["login"]);
        $user->setEmail($userData["new_email"]);
        $user->setFirstname($userData["firstname"]);
        $user->setLastname($userData["lastname"]);
        $em->flush();

        return new Response('Updated user and changed email to '.$userData["new_email"]);
    }
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
     * @Route("/api/users/{email}", name="user_get")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function findOne($email) {
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery(
            'SELECT u.id,
                    u.login,
                    u.email,
                    u.firstname,
                    u.lastname
            FROM App\Entity\User u
            WHERE u.email = :email'          
        );

        $query->setParameter('email', $email);

        $users = $query->getArrayResult();

        $response = new JsonResponse($users);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Methods','*');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');

        $response->headers->set('Access-Control-Allow-Headers','Content-Type, Authorization');
        return $response;
    }

    
}
