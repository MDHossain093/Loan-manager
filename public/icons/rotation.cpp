#include <iostream>
#include "graphics.h"
#include <conio.h>
#include <cmath>

using namespace std;

int main()
{
    int x1, y1, x2, y2;
    float angle;

    cout << "Enter first coordinate of rectangle (x1 y1): ";
    cin >> x1 >> y1;

    cout << "Enter second coordinate of rectangle (x2 y2): ";
    cin >> x2 >> y2;

    cout << "Enter rotation angle (degree): ";
    cin >> angle;

    initwindow(800, 600);

    // -------- ORIGINAL RECTANGLE --------
    setcolor(WHITE);
    rectangle(x1, y1, x2, y2);
    outtextxy(x1, y1 - 20, (char*)"Original Object");

    // -------- CENTER OF RECTANGLE --------
    float cx = (x1 + x2) / 2.0;
    float cy = (y1 + y2) / 2.0;

    // -------- DEGREE TO RADIAN --------
    float rad = angle * 3.14159 / 180.0;

    // -------- ORIGINAL CORNERS --------
    float x[4] = {x1, x2, x2, x1};
    float y[4] = {y1, y1, y2, y2};

    float xr[4], yr[4];

    // -------- ROTATE EACH POINT ABOUT CENTER --------
    for (int i = 0; i < 4; i++)
    {
        xr[i] = cx + (x[i] - cx) * cos(rad) - (y[i] - cy) * sin(rad);
        yr[i] = cy + (x[i] - cx) * sin(rad) + (y[i] - cy) * cos(rad);
    }

    // -------- DRAW ROTATED RECTANGLE --------
    setcolor(GREEN);
    for (int i = 0; i < 4; i++)
    {
        int next = (i + 1) % 4;
        line(xr[i], yr[i], xr[next], yr[next]);
    }

    outtextxy(xr[0], yr[0] - 20, (char*)"Rotated Object");

    getch();
    closegraph();
    return 0;
}
