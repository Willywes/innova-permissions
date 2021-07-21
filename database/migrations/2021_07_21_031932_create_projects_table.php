<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->text('database_connection')->default('{"driver": "mysql","host": "localhost", "port": "3306","database": "","username": "root","password": "","charset": "utf8","collation": "utf8_general_ci","prefix": ""
}');
            $table->text('laravel_guards')->default('["intranet", "customer"]');
            $table->text('user_classes')->default('["User::class", "Customer::class"]');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
