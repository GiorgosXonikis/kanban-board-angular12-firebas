import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskDialogComponent } from '../dialogs/task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BoardService } from '../board.service';
import { Board, ILabel, Task } from '../board.model';
import { MatDialogRef } from '@angular/material/dialog/dialog-ref';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {
    @Input() board!: Board;

    constructor(private boardService: BoardService,
                private dialog: MatDialog) {
    }

    add(): void {
        const dialogRef = this.openDialog();

        dialogRef.afterClosed().subscribe((value: { task: Task, idx: number | null }) => {
            if (value?.task) {
                this.boardService.updateTasks([...this.board.tasks ?? [], value.task], this.board.id);
            }
        });
    }

    edit(task: Task, idx: number): void {
        const dialogRef = this.openDialog(task, idx, false);

        dialogRef.afterClosed().subscribe((value: { task: Task, idx: number }) => {
            if (value?.task) {
                const tasks = [...<Task[]> this.board.tasks] ?? [];
                tasks.splice(value.idx, 1, value.task);
                this.boardService.updateTasks(tasks, this.board.id);
            }
        });
    }

    delete(): void {
        this.boardService.deleteBoard(this.board.id ?? '');
    }

    reArrangeTasks(event: CdkDragDrop<string[]>): void {
        moveItemInArray(this.board.tasks ?? [], event.previousIndex, event.currentIndex);
        this.boardService.updateTasks(this.board.tasks ?? [], this.board.id ?? '');
    }

    private openDialog(task?: Task, idx?: number, isNew: boolean = true): MatDialogRef<TaskDialogComponent> {
        return this.dialog.open(TaskDialogComponent, {
            width: '500px',
            data: { boardId: this.board.id, task: { ...task }, idx: idx ?? null, isNew }
        });
    }

    getCssClass(label: ILabel | undefined): string {
        return label?.toString() ?? '';
    }


}
