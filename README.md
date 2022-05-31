# Javascript Frameworks Course Assignment

![image](https://ce.accelr.dev/wp-content/uploads/2022/05/Skjermbilde-2022-05-30-120908.png)

Create a Next.js app with the following paths: 
- "/"
- "/detail/:param"
- "/contact"
- "/login"
- "/admin"

## Description

The admin section will not appear in the navigation. I used WordPress for the login functionallity, and a open source API.

### "/"
- Find API that returns an array of items and single items.
- Display two properties from each result.
- Each restult should link to a detail page, passing a parameter in the URL.

### "/detail/:param"
- Display tree items.

### "/contact"
- Create a contact firm with validation on each input.

### "/login"
- Create a form with username and password fields with validation.
- Login request to WordPress API with a JWT plugin installed.
- If successfully logged in, redirect to /admin.

### "/admin"
- This page will simply display an "Admin" heading.


## Built With

- [Next.js](https://nextjs.org/)
- [Bootstrap](https://getbootstrap.com)

## Getting Started

### Installing

1. Clone the repo:

```bash
git clone git@github.com:CharlotteEssajee/js-frameworks-course-assignment-CharlotteEssajee.git
```

2. Install the dependencies:

```
npm i
```

### Running

To run the app, run the following commands:

```bash
npm run dev
```

Follow instructions in terminal or go to:

```
http://localhost:3000/
```

If you want to test the login/admin panel you need to have your own local API.<br/>
I used, and would reccomend using Local by Flywwheel.<br/>
[Local by Flywheel](https://localwp.com/)

## Contributing

Make sure to open a pull request so code can be reviewed.

## Contact

Reach out to me!

[My Instagram page](https://instagram.com/essajee)

[My LinkedIn page](https://linkedin.com/in/charlotte-essajee-67aa39226)
