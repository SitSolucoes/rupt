<?php namespace App;

use Illuminate\Foundation\Application;

class App extends Application  
{
    public function publicPath()  
    {
        return $this->basePath.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'public_html'.DIRECTORY_SEPARATOR.'api'.DIRECTORY_SEPARATOR.'public';
    }
}