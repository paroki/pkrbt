<?php

namespace Paroki\Tests\Bridge\Google\Controller;

use Paroki\Bridge\Google\Authentication\OAuth;
use Paroki\Bridge\Google\Controller\OAuthController;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\JsonResponse;

class OAuthControllerTest extends TestCase
{
  public function testCheck(): void
  {
    $oauth = $this->createMock(OAuth::class);
    $controller = new OAuthController();
    $expected = $this->createMock(JsonResponse::class);

    $oauth->expects($this->once())
      ->method('check')
      ->willReturn($expected);

    $response = $controller->check($oauth);
    $this->assertSame($expected, $response);
  }
}
