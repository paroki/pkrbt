<?php

namespace Paroki\Fixtures\Factory;

use Paroki\User\Entity\User;
use Paroki\User\UserConstants;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Zenstruck\Foundry\Persistence\PersistentProxyObjectFactory;

/**
 * @extends PersistentProxyObjectFactory<User>
 */
final class UserFactory extends PersistentProxyObjectFactory
{
  /**
   * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
   *
   * @todo inject services if required
   */
  public function __construct(
    private UserPasswordHasherInterface $hasher
  ) {
    parent::__construct();
  }

  public static function class(): string
  {
    return User::class;
  }

  /**
   * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
   *
   * @todo add your default values here
   */
  protected function defaults(): array|callable
  {
    return [
      'email' => self::faker()->email(),
      'name' => self::faker()->name(),
      'roles' => [UserConstants::ROLE_USER],
    ];
  }

  /**
   * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
   */
  protected function initialize(): static
  {
    $hasher = $this->hasher;
    return $this
      ->afterInstantiate(function (User $user) use ($hasher): void {
        $hashed = $hasher->hashPassword($user, 'testing');
        $user->setPassword($hashed);
      });
  }
}
