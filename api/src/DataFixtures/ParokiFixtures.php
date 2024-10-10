<?php

namespace Paroki\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Paroki\Fixtures\Story\DefaultUsersStory;

class ParokiFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);

        DefaultUsersStory::load();
        $manager->flush();
    }
}
