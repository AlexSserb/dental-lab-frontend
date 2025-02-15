# The system of accounting and planning of order fulfillment in the dental laboratory

## Table of contents
* [Introduction](#introduction)
* [Technologies](#technologies)
* [Tools](#tools)
* [Installation](#installation)

<a name="introduction"></a>
## Introduction

The system is designed for a dental laboratory. The laboratory receives orders from clients (doctors). Each order consists of products. To perform each product, several dental technicians must perform a sequence of operations. After completing all the work, the doctor accepts and pays for the products.

There are 3 roles in the system:
1. *Doctor*. The doctor can register in the system, place orders and view the progress of his orders.
2. *Dental technician*. A dental technician can receive operations to perform and mark their statuses. There are 4 departments according to which they perform different operations:
   - *Modeling Department.*
   - *CAD/CAM Department.*
   - *Ceramics Department.*
   - *Prosthetics Department.*
3. *Laboratory administrator*. The administrator can view the progress of work, place and adjust orders, and distribute operations to technicians.

<a name="technologies"></a>
## Technologies
* Backend:
  - Python 3.13
  - Django 5
  - Django REST Framework
  - DRF-spectacular (OpenAPI schema generation)
  - django-pgtrigger, django-pghistory
* Frontend:
  - TypeScript
  - React 18
  - Axios
  - Mantine
  - OpenAPI Generator (for automated TS client generation)
* Database:
  - PostgreSQL

<a name="tools"></a>
## Tools
* Git
* Pycharm
* WebStorm
* DataGrip
* Npm
* Pip

<a name="installation"></a>
## Installation
1. Clone backend and frontend repositories:
    ```commandline
    git clone https://github.com/AlexSserb/dental-lab-backend.git
    git clone https://github.com/AlexSserb/dental-lab-frontend.git
    ```
2. Create and configure the database.

    2.1. Ensure your PostgreSQL server is running.

    2.2. Create a database with your user as the owner.

    2.3. In the backend repo copy `.env.example` file as `.env` and update with the following fields with your database credentials:
    ```
    DATABASE_NAME=DatabaseName
    DATABASE_USER=DatabaseUser
    DATABASE_PASSWORD=DatabasePassword
    SECRET_KEY=your_secret_key
    ```

3. Run the backend part.

    3.1. Create and activate virtual environment:
    ```commandline
    python -m venv venv 
    venv\\Scripts\\activate
    ```
    3.2. Install requirements:
    ```commandline
    pip install -r requirements.txt 
    ```
    3.3. Create migrations and load fixtures:
    ```commandline
    python manage.py makemigrations accounts api
    python manage.py migrate
    python manage.py loaddata groups_data.json statuses.json
    ```
    3.4. Start the backend server:
    ```commandline
    python manage.py runserver
    ```

4. Run the frontend part.

    4.1. In the frontend repo copy `.env.example` file as `.env` and update with the following fields with your backend server credentials:
    ```
    VITE_API_URL=http://example.com/
    ```

    4.2. Start the frontend server.
    ```commandline
    npm i
    npm start
    ```
