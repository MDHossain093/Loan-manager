#include <iostream>
#include "graphics.h"
#include <conio.h>

using namespace std;

int main()
{
    int x1, y1, x2, y2;
    float Sx, Sy;

    // -------- INPUT --------
    cout << "Enter first coordinate of rectangle (x1 y1): ";
    cin >> x1 >> y1;

    cout << "Enter second coordinate of rectangle (x2 y2): ";
    cin >> x2 >> y2;

    cout << "Enter Scaling factor Sx: ";
    cin >> Sx;

    cout << "Enter Scaling factor Sy: ";
    cin >> Sy;

    // -------- GRAPHICS WINDOW --------
    initwindow(800, 600);

    // -------- ORIGINAL OBJECT --------
    setcolor(WHITE);
    rectangle(x1, y1, x2, y2);
    outtextxy(x1, y1 - 20, (char*)"Original Object");

    // -------- SCALING FORMULA --------
    int x1_new = x1 * Sx;
    int y1_new = y1 * Sy;
    int x2_new = x2 * Sx;
    int y2_new = y2 * Sy;

    // -------- SCALED OBJECT --------
    setcolor(GREEN);
    rectangle(x1_new, y1_new, x2_new, y2_new);
    outtextxy(x1_new, y1_new - 20, (char*)"Scaled Object");

    getch();
    closegraph();
    return 0;
}
