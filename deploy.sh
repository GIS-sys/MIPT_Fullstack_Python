echo "Start deploying"

echo "Killing previous verson"
ssh admin@158.160.14.47 "screen -wipe; killall screen"

echo "Prepare to deploy - local copy"
cd ../
rm -rf copy
cp -r MIPT_Fullstack_project copy
rm -r copy/hookies/node_modules

echo "Prepare to deploy - copy node modules on prod"
ssh admin@158.160.14.47 "mv project/hookies/node_modules ./; rm -r project; mkdir project;"

echo "Copy from local to prod"
scp -q -o LogLevel=QUIET -rp ./copy/* admin@158.160.14.47:~/project

echo "Move node_modules on prod"
ssh admin@158.160.14.47 "mv ./node_modules project/hookies/;"

echo "Run"
ssh admin@158.160.14.47 "screen -L -dm bash -c \"cd project/myback/; python3.8 manage.py runserver 0.0.0.0:8000\""
ssh admin@158.160.14.47 "screen -L -dm bash -c \"cd project/hookies/; npm run start\""

echo "Done"

