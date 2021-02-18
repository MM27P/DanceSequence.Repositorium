#DanceSequence.Repositorium

Application to manage your base of movements of differents dances.
Allows
<li>-Add new moves for dances.
<li>-Add tags for moves
<li>-Add available moves after and before current move.
<li>-Create sequences of moves.

#Technology

-C# .NET CORE 5 with Entity Framework and swagger
-MS SQL Server13 
-Framework Angular with TypeScript and Bootstrap.

#Instalations

- Clone this repository
- Change in appsettings.json db connection
- Update(create) dabase.
- Build and run project from visual. It automaticcly run angular part too. 


#Instructions

Move- every move have name, description, dance to which it belong. Every move have pre and post moves and can have alternatives. Additionaly you can add base your own custom tags to move, to better manage your list. To add or edit your move, move to Move. Click add and pass throught MoveForm to create new Move. You don;t have to go to the end, to save result. After every page, your changes will be save.

Tags- here you can view acutal lsit of tags for move. Eventually you can add new tag, edit or delete existing tag.

Sequence - Here is core of application. This page view every sequnce of current user. Here you can view every sequence and add new. After clicked 'Add' button, you will see new tabel. With combobox where you choose next move. List of available moves depends on, which move you choose before. Button 'Delete Last' remove last added move to list. Sequence must have at least one move, to be added. 
