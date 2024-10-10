<?php

namespace Paroki\Fixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Paroki\Fixtures\Story\DefaultUsersStory;
use Paroki\User\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasher;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class ParokiFixtures extends Fixture
{
  public function __construct(
    private UserPasswordHasherInterface $hasher
  ) {}
  public function load(ObjectManager $manager): void
  {
    // $product = new Product();
    // $manager->persist($product);

    DefaultUsersStory::load();

    $user = new User();
    $user
      ->setEmail('user@example.com')
      ->setName('Test User')
      ->setPassword($this->hasher->hashPassword($user, 'testing'))
    ;

    $manager->persist($user);
    $manager->flush();
  }
}
