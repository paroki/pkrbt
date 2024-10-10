<?php

namespace Paroki\Tests\User;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use Paroki\Fixtures\Factory\UserFactory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class UserTest extends ApiTestCase
{
  use ResetDatabase, Factories;

  public function testGetCollection(): void
  {
    UserFactory::createMany(5);

    $response = static::createClient()->request('GET', '/users');

    $this->assertResponseIsSuccessful();
    $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

    $this->assertJsonContains([
      '@context' => '/contexts/User',
      '@id' => '/users'
    ]);
  }
}
