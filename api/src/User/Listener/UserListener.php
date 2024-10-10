<?php

namespace Paroki\User\Listener;

use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Events;
use Paroki\User\Entity\User;
use Symfony\Component\Uid\Uuid;

#[AsEntityListener(
  event: Events::prePersist,
  method: 'prePersist',
  entity: User::class
)]
class UserListener
{
  public function prePersist(User $user): void
  {
    $user->setUuid(Uuid::v4());
  }
}
