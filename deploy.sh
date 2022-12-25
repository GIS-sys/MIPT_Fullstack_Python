ssh admin@158.160.14.47 "screen -wipe; killall screen"

cd ../
rm -rf copy
cp -r MIPT_Fullstack_project copy
rm -r copy/hookies/node_modules
ssh admin@158.160.14.47 "mv project/hookies/node_modules ./; rm -r project; mkdir project;"
scp -q -o LogLevel=QUIET -rp ./copy/* admin@158.160.14.47:~/project
ssh admin@158.160.14.47 "mv ./node_modules project/hookies/;"

ssh admin@158.160.14.47 "screen -L -dm bash -c \"cd project/myback/; python3.8 manage.py runserver\""
ssh admin@158.160.14.47 "screen -L -dm bash -c \"cd project/hookies/; npm run start\""

