import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BoardDialogComponent } from '../dialogs/board-dialog.component';
import { Board } from '../board.model';
import { BoardService } from '../board.service';
import { tap } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog/dialog-ref';

@Component({
    selector: 'app-boards-list',
    templateUrl: './boards-list.component.html',
    styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent implements OnInit {
    boards$!: Observable<Board[]>;
    boards!: Board[];

    constructor(private boardService: BoardService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.boards$ = this.boardService.getUserBoards()
            .pipe(
                tap(boards => this.boards = boards)
            );
    }

    drop(event: CdkDragDrop<string[]>): void {
        moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
        this.boardService.sortBoards(this.boards);
    }

    create(): void {
        this.creationDialog.afterClosed()
            .subscribe(title => {
                if (title) {
                    const board = { title, priority: this.boards.length };
                    // const board = { title, priority: this.boards.length, tasks: [{ description: 'Hello World!', label: 'blue' }] };
                    this.boardService.createBoard(board as Board);
                }
            });
    }

    get creationDialog(): MatDialogRef<BoardDialogComponent> {
        return this.dialog.open(BoardDialogComponent, {
            width: '400px',
            data: {}
        });
    }


}
