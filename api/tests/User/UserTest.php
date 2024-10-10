<?php

namespace Paroki\Tests\User;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use ApiPlatform\Symfony\Bundle\Test\Client;
use Paroki\Fixtures\Factory\UserFactory;
use Paroki\User\UserConstants;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class UserTest extends ApiTestCase
{
  use ResetDatabase, Factories;

  public function testJwt(): void
  {
    UserFactory::createOne([
      'email' => 'test@example.com',
    ])->_enableAutoRefresh();

    $response = static::createClient()->request('POST', '/auth/login-check', [
      'headers' => ['Content-Type' => 'application/json'],
      'json' => [
        'username' => 'test@example.com',
        'password' => 'testing'
      ]
    ]);

    $json = $response->toArray();
    $this->assertResponseIsSuccessful();
    $this->assertArrayHasKey('token', $json);
  }

  public function createAuthenticatedClient($roles = [UserConstants::ROLE_USER]): Client
  {
    UserFactory::createOne([
      'email' => 'test@example.com',
      'roles' => $roles
    ])->_enableAutoRefresh();

    $client = static::createClient();

    $response = $client->request('POST', '/auth/login-check', [
      'headers' => ['Content-Type' => 'application/json'],
      'json' => [
        'username' => 'test@example.com',
        'password' => 'testing'
      ]
    ]);

    $json = $response->toArray();

    $client->setDefaultOptions(['auth_bearer' => $json['token']]);
    return $client;
  }

  public function testGetCollection(): void
  {
    UserFactory::createMany(5);
    $client = $this->createAuthenticatedClient();
    $client->request('GET', '/users');

    $this->assertResponseIsSuccessful();
    $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

    $this->assertJsonContains([
      '@context' => '/contexts/User',
      '@id' => '/users'
    ]);
  }
}
