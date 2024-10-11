<?php

namespace Paroki\User\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use League\OAuth2\Client\Provider\GoogleUser;
use Paroki\User\Entity\User;

class UserRepository extends ServiceEntityRepository
{
  public function __construct(
    ManagerRegistry $manager
  ) {
    parent::__construct($manager, User::class);
  }

  public function create(): User
  {
    return new User();
  }

  public function fromGoogle(GoogleUser $googleUser): User
  {
    $user = $this->findOneBy([
      'googleId' => $googleUser->getId()
    ]);

    if(!$user){
      $user = $this->findOneBy(['email' => $googleUser->getEmail()]);
    }

    if (!$user) {
      $user = $this->create();
      $user
        ->setGoogleId($googleUser->getId())
        ->setName($googleUser->getName())
        ->setEmail($googleUser->getEmail())
        ->setAvatar($googleUser->getAvatar())
        ;
      $this->getEntityManager()->persist($user);
      $this->getEntityManager()->flush();
    }

    return $user;
  }
}
