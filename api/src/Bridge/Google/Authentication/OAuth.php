<?php

namespace Paroki\Bridge\Google\Authentication;

use Doctrine\Persistence\ObjectManager;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use KnpU\OAuth2ClientBundle\Client\OAuth2ClientInterface;
use League\OAuth2\Client\Provider\GoogleUser;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Paroki\User\Repository\UserRepository;
use Paroki\User\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;

class OAuth
{
  private OAuth2ClientInterface $client;

  public function __construct(
    ClientRegistry $registry,
    private ObjectManager $objectManager,
    private UserRepository $repository,
    private JWTTokenManagerInterface $tokenManager
  ) {
    $this->client = $registry->getClient('google');
  }

  public function check(): JsonResponse
  {
    $client = $this->client;
    $tokenManager = $this->tokenManager;

    /** @var GoogleUser $user */
    $googleUser = $client->fetchUser();
    $user = $this->findOrCreateUser($googleUser);
    $token = $tokenManager->create($user);

    return new JsonResponse([
      'token' => $token,
    ]);
  }

  private function findOrCreateUser(GoogleUser $googleUser): User
  {
    $om = $this->objectManager;
    $repository = $this->repository;
    $user = $repository->findOneBy(['email' => $googleUser->getEmail()]);

    if (!$user) {
      // create new user
      $user = $repository->create();
      $user->setEmail($googleUser->getEmail());
      $user->setName($googleUser->getName());
      $user->setAvatar($googleUser->getAvatar());

      $om->persist($user);
      $om->flush();
    }

    return $user;
  }
}
