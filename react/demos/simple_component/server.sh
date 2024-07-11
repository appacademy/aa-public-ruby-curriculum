if !([ -d "node_modules" ]); then
  npm install
fi

ruby -run -ehttpd . -p8000
