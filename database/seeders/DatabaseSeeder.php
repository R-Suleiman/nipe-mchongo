<?php

namespace Database\Seeders;

use App\Models\GigCategory;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
       public function run(): void
    {
        $this->call([
            UserSeeder::class,
            GigCategorySeeder::class,
        ]);
    }
}
    /**
     * Seed the application's database.
     */
    class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'firstname' => 'John',
            'lastname' => 'Doe',
            'username' => 'john',
            'dob' => '2005-04-12',
            'gender' => 'male',
            'email' => 'john@example.com',
            'phone' => '123456789',
            'address' => 'Nairobi',
            'usertype' => 'poster',
            'password' => Hash::make('password'),
        ]);

      User::create([
            'firstname' => 'Mary',
            'lastname' => 'Doe',
            'username' => 'mary',
            'dob' => '2005-04-12',
            'gender' => 'male',
            'email' => 'mary@example.com',
            'phone' => '123456789',
            'address' => 'Nairobi',
            'usertype' => 'seeker',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'firstname' => 'admin',
            'lastname' => 'Doe',
            'username' => 'admin',
            'dob' => '2005-04-12',
            'gender' => 'male',
            'email' => 'admin@example.com',
            'phone' => '123456789',
            'address' => 'Nairobi',
            'usertype' => 'admin',
            'password' => Hash::make('password'),
        ]);
    }
}

class GIgCategorySeeder extends Seeder {
    public function run(): void {
        foreach(range(1, 5) as $i) {
            GigCategory::create(['name' => 'category ' . $i, 'description' => 'description for category ' . $i]);
        }
    }
}

