<?php

namespace Paroki\User\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
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
}
