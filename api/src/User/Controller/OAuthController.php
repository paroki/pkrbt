<?php

namespace Paroki\User\Controller;

use Paroki\User\Authenticator\OAuthAuthenticator;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Attribute\Route;

#[AsController]
class OAuthController
{
  #[Route(
    name: 'oauth_google_check',
    path: '/connect/google/check'
  )]
  public function checkGoogle(OAuthAuthenticator $authenticator,  Request $request): JsonResponse
  {
    return $authenticator->authenticate('google', $request->get('access_token'));
  }
}
