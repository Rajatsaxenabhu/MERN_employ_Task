# #!/bin/bash
docker-compose down
# Function to stop all running containers
stop_all_containers() {
    echo "Stopping all running containers..."
    docker stop $(docker ps -q)
}

# Function to remove all containers
remove_all_containers() {
    echo "Removing all containers..."
    docker rm $(docker ps -a -q)
}

# Function to remove all images
remove_all_images() {
    echo "Removing all Docker images..."
    docker rmi $(docker images -q) --force
}

# Function to clean up dangling volumes
remove_dangling_volumes() {
    echo "Removing dangling volumes..."
    docker volume prune -f
}

# Function to clean up unused networks
remove_unused_networks() {
    echo "Removing unused networks..."
    docker network prune -f
}

# Start cleanup process
stop_all_containers
remove_all_containers
remove_all_images
remove_dangling_volumes
remove_unused_networks

echo "Docker cleanup complete."
docker-compose up --build
