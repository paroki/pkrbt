<?php

namespace Paroki\Tests\Bridge\Google\Authentication;

use Doctrine\Persistence\ObjectManager;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use KnpU\OAuth2ClientBundle\Client\OAuth2ClientInterface;
use League\OAuth2\Client\Provider\GoogleUser;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Paroki\Bridge\Google\Authentication\OAuth;
use Paroki\User\Entity\User;
use Paroki\User\Repository\UserRepository;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class OAuthTest extends TestCase
{

  private MockObject|OAuth2ClientInterface $client;
  private MockObject|ClientRegistry $registry;
  private MockObject|ObjectManager $objectManager;
  private MockObject|UserRepository $repository;
  private MockObject|JWTTokenManagerInterface $tokenManager;
  private MockObject|GoogleUser $googleUser;
  private MockObject|User $user;
  private OAuth $oauth;

  public function setUp(): void
  {
    $this->registry = $this->createMock(ClientRegistry::class);
    $this->client = $this->createMock(OAuth2ClientInterface::class);
    $this->objectManager = $this->createMock(ObjectManager::class);
    $this->repository = $this->createMock(UserRepository::class);
    $this->tokenManager = $this->createMock(JWTTokenManagerInterface::class);
    $this->googleUser = $this->createMock(GoogleUser::class);
    $this->user = $this->createMock(User::class);
  }

  private function configureOAuth(): void
  {
    $this->registry->method('getClient')
      ->with('google')
      ->willReturn($this->client);

    $this->client->method('fetchUser')
      ->willReturn($this->googleUser);

    $this->repository->method('create')
      ->willReturn($this->user);

    $this->oauth = new OAuth(
      $this->registry,
      $this->objectManager,
      $this->repository,
      $this->tokenManager
    );
  }


  public function testConstructor(): void
  {
    $this->registry->expects($this->once())
      ->method('getClient')
      ->with('google')
      ->willReturn($this->client);

    $ob = new OAuth($this->registry, $this->objectManager, $this->repository, $this->tokenManager);
  }

  public function testCheck(): void
  {
    $this->client->expects($this->once())
      ->method('fetchUser')
      ->willReturn($this->googleUser);

    $this->repository->expects($this->once())
      ->method('findOneBy')
      ->with(['email' => $email = 'some-email@gmail.com']);

    $this->googleUser->expects($this->atLeastOnce())
      ->method('getEmail')
      ->willReturn($email);
    $this->googleUser->expects($this->once())
      ->method('getName')
      ->willReturn('Test User');
    $this->googleUser->expects($this->once())
      ->method('getAvatar')
      ->willReturn('http://gravatar.com/some-avatar.jpg');

    $this->objectManager->expects($this->once())
      ->method('persist')
      ->with($this->user);
    $this->objectManager->expects($this->once())
      ->method('flush');

    $this->configureOAuth();
    $this->oauth->check();
  }
}
