@include('layouts.head')
  <body>
   @yield('main_content')
  </body>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="{{asset('/js/app.js')}}"></script>
</html>
