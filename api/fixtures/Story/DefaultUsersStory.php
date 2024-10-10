<?php

namespace Paroki\Fixtures\Story;

use Paroki\Fixtures\Factory\UserFactory;
use Zenstruck\Foundry\Story;

final class DefaultUsersStory extends Story
{
    public function build(): void
    {
        UserFactory::createMany(5);
    }
}
