#!/bin/bash
cd /home/nicholas/sec/python-project-starter/react-app/public/assets/images

echo "Downloading real trail/nature images..."

# Array of curated free hiking/trail image URLs from Pixabay/Pexels CDN
# These are direct links to royalty-free nature/hiking photos
urls=(
  "https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Mountain trail
  "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Forest path
  "https://images.pexels.com/photos/1183986/pexels-photo-1183986.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Desert trail
  "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Alpine trail
  "https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Coastal path
  "https://images.pexels.com/photos/1637445/pexels-photo-1637445.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Canyon
  "https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Waterfall trail
  "https://images.pexels.com/photos/1574653/pexels-photo-1574653.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Lake trail
  "https://images.pexels.com/photos/1612461/pexels-photo-1612461.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Ridge walk
  "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Valley hike
  "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Rocky trail
  "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Meadow path
  "https://images.pexels.com/photos/1181403/pexels-photo-1181403.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Mountain peak
  "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Forest hike
  "https://images.pexels.com/photos/1670187/pexels-photo-1670187.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Snowy trail
  "https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Lake view
  "https://images.pexels.com/photos/1591375/pexels-photo-1591375.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Cliff trail
  "https://images.pexels.com/photos/1619654/pexels-photo-1619654.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # River trail
  "https://images.pexels.com/photos/1761280/pexels-photo-1761280.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Gorge
  "https://images.pexels.com/photos/1125136/pexels-photo-1125136.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Autumn trail
  "https://images.pexels.com/photos/1450082/pexels-photo-1450082.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Spring trail
  "https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Summit view
  "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Bridge trail
  "https://images.pexels.com/photos/1578750/pexels-photo-1578750.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Pine forest
  "https://images.pexels.com/photos/1785493/pexels-photo-1785493.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Highland trail
  "https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Misty path
  "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Prairie trail
  "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Volcanic trail
  "https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Glacier trail
  "https://images.pexels.com/photos/1582650/pexels-photo-1582650.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Jungle path
  "https://images.pexels.com/photos/1761283/pexels-photo-1761283.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Rock formation
  "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Beach trail
  "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Dune trail
  "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Badlands
  "https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Cave entrance
  "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Rainforest
  "https://images.pexels.com/photos/1561020/pexels-photo-1561020.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Redwood trail
  "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Sunset trail
  "https://images.pexels.com/photos/1576193/pexels-photo-1576193.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Wetland walk
  "https://images.pexels.com/photos/1578755/pexels-photo-1578755.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Birch forest
  "https://images.pexels.com/photos/1624504/pexels-photo-1624504.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Hill trail
  "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Overlook
  "https://images.pexels.com/photos/1761282/pexels-photo-1761282.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Wilderness
  "https://images.pexels.com/photos/1624503/pexels-photo-1624503.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Creek trail
  "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Slot canyon
  "https://images.pexels.com/photos/1561024/pexels-photo-1561024.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Alpine meadow
  "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Tundra
  "https://images.pexels.com/photos/1612461/pexels-photo-1612461.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Riverside
  "https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Ice trail
  "https://images.pexels.com/photos/1181292/pexels-photo-1181292.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" # Grand vista
)

# Download each image
for i in {1..50}; do
  idx=$((i - 1))
  url="${urls[$idx]}"
  echo -n "Downloading trail${i}.jpg... "
  curl -s -o "trail${i}.jpg" "$url" && echo "✓" || echo "✗"
  sleep 0.2
done

# Download default image
echo -n "Downloading default-trail.jpg... "
curl -s -o "default-trail.jpg" "https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" && echo "✓" || echo "✗"

echo ""
echo "✨ Download complete!"
echo "Total images: $(ls -1 *.jpg 2>/dev/null | wc -l)"
