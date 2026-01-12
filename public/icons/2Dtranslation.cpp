#include <iostream>
#include "graphics.h"
#include <conio.h>

using namespace std;

int main()
{
    int x1, y1, x2, y2;
    int Tx, Ty;

    // -------- INPUT --------
    cout << "Enter first coordinate of rectangle (x1 y1): ";
    cin >> x1 >> y1;

    cout << "Enter second coordinate of rectangle (x2 y2): ";
    cin >> x2 >> y2;

    cout << "Enter Translation Tx: ";
    cin >> Tx;

    cout << "Enter Translation Ty: ";
    cin >> Ty;

    // -------- GRAPHICS WINDOW --------
    initwindow(800, 600);

    // -------- ORIGINAL OBJECT --------
    setcolor(WHITE);
    rectangle(x1, y1, x2, y2);
    outtextxy(x1, y1 - 20, (char*)"Original Object");

    // -------- TRANSLATION FORMULA --------
    int x1_new = x1 + Tx;
    int y1_new = y1 + Ty;
    int x2_new = x2 + Tx;
    int y2_new = y2 + Ty;

    // -------- TRANSLATED OBJECT --------
    setcolor(GREEN);
    rectangle(x1_new, y1_new, x2_new, y2_new);
    outtextxy(x1_new, y1_new - 20, (char*)"Translated Object");

    getch();
    closegraph();
    return 0;
}
