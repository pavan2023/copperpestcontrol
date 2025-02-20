<!DOCTYPE html>ntListener('DOMContentLoaded', function() {
<html lang="en">on = document.getElementById('openIcon');
    const closeIcon = document.getElementById('closeIcon');
<head>nst navItems = document.getElementById('nav-bar');
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
        navItems.classList.remove('hidden');
  <title>Copper Pest Control</title>en');
        closeIcon.classList.remove('hidden');
  <!-- tailwind css CDN -->
  <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
    closeIcon.addEventListener('click', function() {
  <!-- Custom CSS -->sList.add('hidden');
  <link rel="stylesheet" href="./src/css/styles.css">
        closeIcon.classList.add('hidden');
</head>

<body>nst navLinks = document.querySelectorAll('#nav-bar li a');

  <!-- Nav bar start -->k => {
  <nav class="bg-[#789F7B]">r('click', function() {
    <div class="container mx-auto flex justify-between items-center py-4">
      <!-- logo -->assList.add('active');
      <a href="#" class="text-white text-2xl font-bold">Copper Pest Control</a>
    });
      <!-- nav icon for mobile -->      <img id="openIcon" src="./src/img/nav-icon-open.svg" alt="open icon" class="lg:hidden w-8">      <img id="closeIcon" src="./src/img/nav-icon-close.svg" alt="close icon" class="hidden w-8">      <!-- nav icon for mobile -->      <!-- nav links start-->      <ul id="nav-bar" class="flex space-x-4 hidden lg:flex">        <li class="relative group">          <a href="#" class="text-white">Services</a>          <ul class="hidden group-hover:block bg-[#789F7B] absolute mt-2 space-y-2">            <li><a href="#" class="block px-4 py-2 text-white">Cockroach Treatment</a></li>            <li><a href="#" class="block px-4 py-2 text-white">Bed Bug Control</a></li>            <li><a href="#" class="block px-4 py-2 text-white">Rodent Rat Control</a></li>            <li><a href="#" class="block px-4 py-2 text-white">Termite Control</a></li>            <li><a href="#" class="block px-4 py-2 text-white">Ant Control</a></li>            <li><a href="#" class="block px-4 py-2 text-white">Mosquito Control</a></li>          </ul>        </li>        <li class="relative group">          <a href="#" class="text-white">Plans & Packages</a>          <ul class="hidden group-hover:block bg-[#789F7B] absolute mt-2 space-y-2">            <li><a href="#" class="block px-4 py-2 text-white">Single Service Plans</a></li>            <li><a href="#" class="block px-4 py-2 text-white">Subscription Plans</a></li>            <li><a href="#" class="block px-4 py-2 text-white">Seasonal Packages</a></li>          </ul>        </li>        <li><a href="#" class="text-white">Precautions</a></li>        <li><a href="#" class="text-white">Pest Info</a></li>      </ul>      <!-- nav links end-->    </div>  </nav>  <!-- Nav bar End -->

  <script src="./script.js"></script>
</body>

</html>