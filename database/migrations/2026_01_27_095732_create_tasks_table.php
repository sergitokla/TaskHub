<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id(); // ID autoincremental
            $table->string('title'); // Título de la tarea
            $table->text('description')->nullable(); // Descripción (puede estar vacía)
            $table->boolean('is_completed')->default(false); // Estado: ¿Hecha?
            $table->timestamps(); // Crea 'created_at' y 'updated_at' automáticamente
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }

};
