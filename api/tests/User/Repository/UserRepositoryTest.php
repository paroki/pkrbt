<?php

namespace Paroki\Tests\User\Repository;

use League\OAuth2\Client\Provider\GoogleUser;
use Paroki\Tests\Concerns\DoctrineConcern;
use Paroki\User\Entity\User;
use Paroki\User\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Zenstruck\Foundry\Test\ResetDatabase;

class UserRepositoryTest extends KernelTestCase
{
  use DoctrineConcern, ResetDatabase;

  public function testFromGoogle(): void
  {
    /** @var UserRepository $repository */
    $repository = $this->getRepository(User::class);
    $googleUser = new GoogleUser([
      'name' => $name = 'test',
      'email' => $email = 'test@example.com',
      'sub' => 'some-id',
      'picture' => 'some-avatar'
    ]);

    $user = $repository->fromGoogle($googleUser);

    $this->assertInstanceOf(User::class, $user);
    $this->assertNotNull($user->getId());
    $this->assertSame($name, $user->getName());
    $this->assertSame($email, $user->getEmail());
    $this->assertSame('some-id', $user->getGoogleId());
  }
}
