<?php

namespace Paroki\Tests\Concerns;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\KernelInterface;

trait ContainerConcern
{
  protected KernelInterface $kernel;

  protected function setUp(): void
  {
    $this->kernel = self::bootKernel();
  }
}
