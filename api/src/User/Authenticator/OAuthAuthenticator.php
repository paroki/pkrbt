<?php

namespace Paroki\User\Authenticator;

use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use League\OAuth2\Client\Token\AccessToken;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Paroki\User\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class OAuthAuthenticator
{
  public function __construct(
    private ClientRegistry $clientRegistry,
    private JWTTokenManagerInterface $tokenManager,
    private UserRepository $repository
  ) {}

  public function authenticate(string $provider, string $accessToken): JsonResponse
  {
    $client = $this->clientRegistry->getClient($provider);
    $tokenManager = $this->tokenManager;

    $token = new AccessToken([
      'access_token' => $accessToken
    ]);
    $oauthUser = $client->fetchUserFromToken($token);
    $user = null;

    if ('google' == $provider) {
      $user = $this->repository->fromGoogle($oauthUser);
    }

    if (!is_null($user)) {
      $payload = [
        "user" => [
          'id' => $user->getId(),
          'name' => $user->getName(),
          'email' => $user->getEmail(),
          'roles' => $user->getRoles(),
          'registered' => $user->isRegistered(),
        ],
        'token' => $tokenManager->create($user),
      ];
      return new JsonResponse($payload);
    }

    return new JsonResponse([
      'message' => "Provider {$provider} not found."
    ], Response::HTTP_UNPROCESSABLE_ENTITY);
  }
}
