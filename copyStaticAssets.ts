import shell from 'shelljs';

shell.cp('-R', 'src/public', 'dist/public');
shell.cp('-R', 'src/database/sql/common', 'dist/database/sql/common');
shell.cp('-R', 'src/database/sql/products', 'dist/database/sql/products');
shell.cp('-R', 'src/database/sql/users', 'dist/database/sql/users');
