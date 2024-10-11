<?php

namespace Paroki\Tests\User\Authenticator;

use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use KnpU\OAuth2ClientBundle\Client\OAuth2ClientInterface;
use League\OAuth2\Client\Provider\GoogleUser;
use League\OAuth2\Client\Token\AccessToken;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Paroki\User\Authenticator\OAuthAuthenticator;
use Paroki\User\Entity\User;
use Paroki\User\Repository\UserRepository;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\JsonResponse;

class OAuthAuthenticatorTest extends TestCase
{
  public function testAuthenticate(): void
  {
    // setup mocking
    $registry = $this->createMock(ClientRegistry::class);
    $oauthClient = $this->createMock(OAuth2ClientInterface::class);
    $jwtManager = $this->createMock(JWTTokenManagerInterface::class);
    $repository = $this->createMock(UserRepository::class);
    $googleUser = new GoogleUser([]);
    $user = $this->createMock(User::class);


    $authenticator = new OAuthAuthenticator(
      $registry,
      $jwtManager,
      $repository
    );

    $registry->expects($this->once())->method('getClient')
      ->with('google')
      ->willReturn($oauthClient);

    $oauthClient->expects($this->once())
      ->method('fetchUserFromToken')
      ->with($this->isInstanceOf(AccessToken::class))
      ->willReturn($googleUser);

    $repository->expects($this->once())
      ->method('fromGoogle')
      ->with($googleUser)
      ->willReturn($user);

    $jwtManager->expects($this->once())
      ->method('create')
      ->with($user)
      ->willReturn('jwt-token');

    $response = $authenticator->authenticate('google', 'token');
    $this->assertInstanceOf(JsonResponse::class, $response);
  }
}
