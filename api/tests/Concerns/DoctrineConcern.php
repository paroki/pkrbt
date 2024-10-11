<?php

namespace Paroki\Tests\Concerns;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;

trait DoctrineConcern
{
  private ?EntityManagerInterface $em = null;

  protected function getEntityManager(): EntityManagerInterface
  {
    if (is_null($this->em)) {
      $this->em = $this->getContainer()->get('doctrine')->getManager();
    }

    return $this->em;
  }

  protected function getRepository(string $className): EntityRepository
  {
    return $this->getEntityManager()->getRepository($className);
  }
}
