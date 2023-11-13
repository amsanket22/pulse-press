# pulse-press

### set up

```
git clone
set up .env
```
if you don't have PHP and composer setup you can use this command to quickly setup dependancies and use sail
```
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php82-composer:latest \
    composer install --ignore-platform-reqs
```
I prefer using [NVM](https://github.com/nvm-sh/nvm) for node
```
npm i
sail up -d (make sure docker is running)
```



## features

1. uses Laravel for API
2. separate service for Guardian content search
3. Request Validation
4. React on frontend - injected in a blade template with vite
5. tailwindcss
6. uses localstorage for maintaining a data state

## TODO

1. use caching mechanism
2. use database for storage
3. ability to remove pinned articles
4. tests

## Objectives achieved
1. develop proxy API in Laravel
2. used react on frontend
3. date formatting
4. grouped by section
5. ability to pin an article
6. show title, date, section and link of an article
