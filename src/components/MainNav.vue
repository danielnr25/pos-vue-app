
<script setup>
import Categories from './Categories.vue';
import Link from './Link.vue';
import Logo from './Logo.vue';
</script>

<template>
    <header class="px-10 py-5 bg-gray-900 flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between absolute top-0 w-full z-10">
        <div>
          <Logo />
        </div>

        <nav class="flex items-center gap-10">

            <RouterLink 
                :to="{name:'about'}"
                class="text-white text-xl"
            >
                Nosotros
            </RouterLink>
            <RouterLink 
                :to="{name:'contact'}"
                class="text-white text-xl"
            >
                Contacto
            </RouterLink>

            <Link
                ruta="sales"
            >
                Administrador
            </Link>
    
        </nav>
    </header>
    <div class="pt-28 lg:pt-16">
        <Categories />
    </div>
</template>
