<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

use App\Entity\User;

class AuthController extends AbstractController
{
    /**
     * @Route("/auth", name="auth", methods={"POST"})
     */
    public function auth(): Response {
        $request = Request::createFromGlobals();
        $authData = $request->toArray();

        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository(User::class)->findOneBy(['email'=> $authData["email"]]);;

        if (!$user) {
            throw $this->createNotFoundException(
                'No user found for email '.$authData["email"]
            );
        }

        $response = new Response();
        if ($authData["password"] == $user->getPass()) {

            $response->setStatusCode(Response::HTTP_OK);          
        } else {

            $response->setStatusCode(Response::HTTP_NOT_FOUND);
        }

        return $response;
    }
}
