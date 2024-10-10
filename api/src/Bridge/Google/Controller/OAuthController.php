<?php

namespace Paroki\Bridge\Google\Controller;

use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use Paroki\Bridge\Google\Authentication\OAuth;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Attribute\Route;

#[AsController]
class OAuthController
{
  #[Route(name: 'connect_google_check', path: '/connect/google/check')]
  public function check(OAuth $auth): JsonResponse
  {
    return $auth->check();
  }
}
