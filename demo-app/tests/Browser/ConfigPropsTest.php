<?php

namespace Tests\Browser;

use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class ConfigPropsTest extends DuskTestCase
{
    #[Test]
    public function it_can_set_config_globally()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/props-from-config')
                ->waitForText('Prop from Config')
                ->clickLink('Open')
                ->waitFor('.im-dialog')
                ->keys('', ['{escape}'])->assertAttribute('#app', 'inert', '') // Close explicitly
                ->assertPresent('.im-slideover-content')   // Slideover
                ->assertMissing('.im-close-button') // No close button
                ->assertAttributeContains('.im-slideover-positioner', 'class', 'justify-start') // Left-aligned
                ->assertAttributeContains('.im-slideover-content', 'class', 'p-8') // Padding classes
                ->assertAttributeContains('.im-slideover-content', 'class', 'bg-red-100') // Panel classes
                ->assertAttributeContains('.im-slideover-wrapper', 'class', 'lg:max-w-2xl'); // Max width
        });
    }
}
