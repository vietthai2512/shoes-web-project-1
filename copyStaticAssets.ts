import shell from 'shelljs';

shell.rm('-rf', 'dist/public');
shell.cp('-R', 'src/public', 'dist/public');

shell.rm('-rf', 'dist/database/sql/common');
shell.cp('-R', 'src/database/sql/common', 'dist/database/sql/common');

shell.rm('-rf', 'dist/database/sql/products');
shell.cp('-R', 'src/database/sql/products', 'dist/database/sql/products');

shell.rm('-rf', 'dist/database/sql/users');
shell.cp('-R', 'src/database/sql/users', 'dist/database/sql/users');
