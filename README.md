# CocktailWeb

## Setup

### project Setup

1. **Clone the repository**:
   ```bash
   git clone git@github.com:henni-yousra/CocktailWeb.git


### Install dependencies
   ```bash
cd CocktailWeb
docker-compose -f docker-compose.dev.yml up --build
   ```

# access data base

   ```bash
docker exec -it mongodb mongosh
use cocktaildb
db.users.find({}, { email:1 , password:1 });
   ```