<?php

namespace Paroki\Tests\User\Controller;

use Paroki\User\Authenticator\OAuthAuthenticator;
use Paroki\User\Controller\OAuthController;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;

class OAuthControllerTest extends TestCase
{
  public function testCheckGoogle(): void
  {
    $authenticator = $this->createMock(OAuthAuthenticator::class);
    $request = $this->createMock(Request::class);

    $request->expects($this->once())
      ->method('get')
      ->with('access_token')
      ->willReturn('token');
    $authenticator->expects($this->once())
      ->method('authenticate')
      ->with('google', 'token');

    $controller = new OAuthController();

    $controller->checkGoogle($authenticator, $request);
  }
}
