<?php

namespace Paroki\User\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Paroki\User\Repository\UserRepository;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: 'api_users')]
#[ApiResource()]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
  #[ORM\Id]
  #[ORM\GeneratedValue(strategy: 'AUTO')]
  #[ORM\Column(type: 'integer', unique: true)]
  private int $id;

  #[ORM\Column(type: UuidType::NAME, unique: true)]
  private ?Uuid $uuid;

  #[ORM\Column(type: 'string')]
  private string $name;

  #[ORM\Column(type: 'string')]
  private string $email;

  #[ORM\Column(type: 'json')]
  private array $roles = [];

  #[ORM\Column(type: 'string', nullable: true)]
  private ?string $password = null;

  public function getId(): int
  {
    return $this->id;
  }

  public function setUuid(Uuid $uuid): self
  {
    $this->uuid = $uuid;

    return $this;
  }

  public function getUuid(): ?Uuid
  {
    return $this->uuid;
  }

  public function setName(string $name): self
  {
    $this->name = $name;

    return $this;
  }

  /**
   * User Fullname
   */
  public function getName(): string
  {
    return $this->name;
  }

  public function setEmail(string $email): self
  {
    $this->email = $email;

    return $this;
  }

  /**
   * User primary email
   */
  public function getEmail(): string
  {
    return $this->email;
  }


  /**
    * The public representation of the user (e.g. a username, an email address, etc.)
    *
    * @see UserInterface
    */
  public function getUserIdentifier(): string
  {
    return (string) $this->email;
  }

  public function setRoles(array $roles): self
  {
    $this->roles = $roles;

    return $this;
  }

  public function getRoles(): array
  {
    $roles = $this->roles;
    $roles[] = 'ROLE_USER';

    return array_unique($this->roles);
  }

  public function setPassword(string $password): self
  {
    $this->password = $password;

    return $this;
  }

  /**
   * @see PasswordAuthenticatedUserInterface
   */
  public function getPassword(): ?string
  {
    return $this->password;
  }

  public function eraseCredentials(): void
  {

  }
}
